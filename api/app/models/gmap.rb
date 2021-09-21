class Gmap < ApplicationRecord
    require 'digest/md5'
    include Rails.application.routes.url_helpers
    validates :title, presence: true, length: { minimum: 1, maximum: 25 }
    validates :comment, presence: true, length: { minimum: 1, maximum: 255 }
    validates :latitude, presence: true
    validates :longitude, presence: true
    validates :picture, presence: true

    # validates :image, attached_file_presence: true
    before_save :encrypt_magic_word

    # def image_url
    #   # 紐づいている画像のURLを取得する
    #   picture.attached? ? url_for(picture) : nil
    # end

    def encrypt_magic_word
      if magic_word.present?
        self.magic_word = Digest::MD5.hexdigest(self.magic_word)
      else
        self.magic_word = ""
      end
    end
    belongs_to :user

end
