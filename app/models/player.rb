# frozen_string_literal: true

class Player < ApplicationRecord
  belongs_to :team

  validates :name, presence: true
  validates :position, presence: true
  validates :jersey_number, presence: true

  rhino_owner :team
  rhino_references [ :team ]
end
