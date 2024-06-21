class PostSerializer < ActiveModel::Serializer
  attributes :id, :post_body, :created_at, :username, :user_id
  has_many :comments

  def comments
    object.comments.order(created_at: :desc)
  end

  def username
    object.user.username
  end
end
