# frozen_string_literal: true

class Team < ApplicationRecord
  belongs_to :organization

  has_many :match_teams, dependent: :destroy
  has_many :tournament_predictions, dependent: :destroy
  has_many :players, dependent: :destroy
  has_many :favorite_teams, dependent: :destroy

  validates :name, presence: true
  validates :group_name, presence: true
  validates :status, presence: true

  rhino_owner :organization
  rhino_references [ :organization ]
end
