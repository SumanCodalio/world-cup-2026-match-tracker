# frozen_string_literal: true

class PredictionModel < ApplicationRecord
  belongs_to :organization

  has_many :match_probabilities, dependent: :destroy

  validates :name, presence: true
  validates :version, presence: true

  rhino_owner :organization
  rhino_references [ :organization ]
end
