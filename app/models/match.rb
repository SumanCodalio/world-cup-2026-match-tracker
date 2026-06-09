# frozen_string_literal: true

class Match < ApplicationRecord
  belongs_to :venue

  has_many :match_teams, dependent: :destroy
  has_many :match_probabilities, dependent: :destroy
  has_many :notifications, dependent: :destroy

  validates :kickoff_time, presence: true
  validates :stage, presence: true
  validates :status, presence: true

  rhino_owner :venue
  rhino_references [ :venue ]
end
