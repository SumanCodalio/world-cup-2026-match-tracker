# frozen_string_literal: true

class Article < ApplicationRecord
  belongs_to :organization

  validates :title, presence: true
  validates :content, presence: true

  rhino_owner :organization
  rhino_references [ :organization ]
end
