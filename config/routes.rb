Rails.application.routes.draw do
  resources :pets, except: [:new, :edit]
  resources :posts, except: [:new, :edit]
  mount_devise_token_auth_for 'User', at: 'auth'
  
end
