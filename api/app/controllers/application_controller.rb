class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        # protect_from_forgery with: :exception
        skip_before_action :verify_authenticity_token, raise: false

end
