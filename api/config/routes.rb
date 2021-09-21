Rails.application.routes.draw do
  
    namespace :api, format: 'json' do
      namespace :v1 do
        resources :gmaps, only: [:index, :create, :destroy]
        get 'users/current_user', to: 'users#show'
        get 'gmaps/search_public', to: 'gmaps#search_public'
        get 'gmaps/search_private', to: 'gmaps#search_private'
        get 'gmaps/presigned-url', to: 'gmaps#presigned_url'

      end
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/auth/registrations'
      }
    end
end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

