# frozen_string_literal: true

class Team < ApplicationRecord
  belongs_to :organization, optional: true

  has_many :match_teams, dependent: :destroy
  has_many :tournament_predictions, dependent: :destroy
  has_many :players, dependent: :destroy
  has_many :favorite_teams, dependent: :destroy

  validates :name, presence: true

  rhino_owner :organization
  rhino_references [ :organization, :players ]

  accepts_nested_attributes_for :players, allow_destroy: true

  after_initialize :set_organization, if: :new_record?
  before_validation :set_defaults

  private

  def set_defaults
    self.group_name ||= "Group A" if group_name.blank?
    self.status ||= "active" if status.blank?
    self.organization ||= Organization.first
  end

  def set_organization
    self.organization ||= Organization.first
  end
end
