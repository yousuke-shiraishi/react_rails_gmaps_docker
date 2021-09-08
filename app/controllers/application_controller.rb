class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        # skip_before_action :verify_authenticity_token, if: :devise_controller? # APIではCSRFチェックをしない
        skip_before_action :verify_authenticity_token, raise: false
        # protect_from_forgery with: :exception

end
