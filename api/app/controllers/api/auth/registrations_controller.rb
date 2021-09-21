class Api::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
    private

    def sign_up_params
      params.permit(:username, :email, :birth, :password, :password_confirmation)
    end

    def account_update_params
      params.permit(:username, :email, :birth)
    end
end
