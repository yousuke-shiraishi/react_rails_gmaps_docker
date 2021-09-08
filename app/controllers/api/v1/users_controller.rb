module Api
    module V1
        class UsersController < ApplicationController
            before_action :authenticate_api_user!, only: [:show]
            before_action :set_user, only: [:show]

            def show
                render json: @user
            end
            private

            def set_user
                @user = current_api_user
            end
        end
    end
end
