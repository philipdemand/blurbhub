class Api::V1::UsersController < ApplicationController

  skip_before_action :authorized, only: [:create, :show]
  wrap_parameters :user, include: [:username, :email, :password, :password_confirmation]

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find_by(id: session[:user_id])
    render json: @user
  end

  def create
    @user = User.create!(user_params)
    session[:user_id] = @user.id
    render json: @user, status: :created
  end

  private
  
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
  
end
