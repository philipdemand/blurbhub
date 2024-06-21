class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: %i[ update destroy ]

  def create
    @post = Post.find(params[:id])
    @comment = @post.comments.new(comment_params)
    @comment.user_id = session[:user_id]
    @comment.save!
    render json: @comment, status: :created
  end

  def update
    if session[:user_id] == @comment.user_id
      @comment.update!(comment_params)
      render json: @comment
    else
      render json: { error: 'Unauthorized: You do not have permission to edit this comment.' }, status: :unauthorized
    end
    # @comment.update!(comment_params)
    # render json: @comment
  end

  def destroy
    if session[:user_id] == @comment.user_id
      @comment.destroy
      head :no_content
    else
      render json: { error: 'Unauthorized: You do not have permission to delete this comment.' }, status: :unauthorized
    end
    # @comment.destroy
    # head :no_content
  end

  private

    def set_comment
      @comment = Comment.find(params[:id])
    end

    def comment_params
      params.require(:comment).permit(:comment_body)
    end
end
