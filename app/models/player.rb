# frozen_string_literal: true

class Player < ApplicationRecord
  belongs_to :organization, optional: true
  belongs_to :team, optional: true

  validates :name, presence: true

  rhino_owner :organization
  rhino_references [ :organization, :team ]

  after_initialize :set_organization, if: :new_record?
  before_validation :set_organization

  private

  def set_organization
    self.organization ||= team&.organization || Organization.first
  end
end
