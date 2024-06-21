class CommentSerializer < ActiveModel::Serializer
    attributes :id, :comment_body, :created_at, :commenter, :post_id, :user_id

    def commenter
        object.user.username
    end
end