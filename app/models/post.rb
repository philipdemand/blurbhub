# class Post < ApplicationRecord
#     belongs_to :user
#     has_many :comments
# end

class Post < ApplicationRecord
    belongs_to :user
    has_many :comments
  
    validates :post_body, presence: true, length: { maximum: 255 }
    validates :user_id, presence: true
  end
