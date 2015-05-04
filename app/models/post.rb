class Post < ActiveRecord::Base
	belongs_to :user
	validates :titulo, presence: true
end