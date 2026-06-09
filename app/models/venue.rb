# frozen_string_literal: true

class Venue < ApplicationRecord
  belongs_to :organization

  has_many :matches, dependent: :destroy

  validates :name, presence: true
  validates :city, presence: true
  validates :capacity, presence: true
  validates :timezone, presence: true

  rhino_owner :organization
  rhino_references [ :organization ]
end
