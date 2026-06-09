# frozen_string_literal: true

class MatchTeam < ApplicationRecord
  belongs_to :match
  belongs_to :team

  validates :is_home, inclusion: { in: [ true, false ] }
  validates :score, presence: true

  rhino_owner :match
  rhino_references [ :match, :team ]
end
