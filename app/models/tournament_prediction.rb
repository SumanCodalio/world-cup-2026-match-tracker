# frozen_string_literal: true

class TournamentPrediction < ApplicationRecord
  belongs_to :team

  validates :prediction_type, presence: true
  validates :probability, presence: true

  rhino_owner :team
  rhino_references [ :team ]
end
