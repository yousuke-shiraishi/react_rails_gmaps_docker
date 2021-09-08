# frozen_string_literal: true

class User < ActiveRecord::Base
  # has_one_attached :avatar
  validates :email,              presence: true
  validates :username,  presence: true, length: { maximum: 30 }
  validates :birth, presence: true, format: { with: /\A\d{4}-\d{2}-\d{2}\z/ }

  has_many :gmaps, dependent: :destroy
  accepts_nested_attributes_for :gmaps
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  # include DeviseTokenAuth::Concerns::Userの対策
  # メールを送らせるための関数
  # after_create :send_confirmation_email, if: -> { !Rails.env.test? && Customer.devise_modules.include?(:confirmable) }
  # private
  # def send_confirmation_email
  #   self.send_confirmation_instructions
  # end
end
