# class User < ApplicationRecord
#     has_secure_password
#     has_many :posts
#     has_many :comments
# end

class User < ApplicationRecord
    has_secure_password
    has_many :posts
    has_many :comments
  
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
  end
