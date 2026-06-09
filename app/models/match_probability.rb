# frozen_string_literal: true

class MatchProbability < ApplicationRecord
  belongs_to :match
  belongs_to :prediction_model

  validates :home_win_prob, presence: true
  validates :away_win_prob, presence: true
  validates :draw_prob, presence: true

  rhino_owner :match
  rhino_references [ :match, :prediction_model ]
end
