# frozen_string_literal: true

class UserPreference < ApplicationRecord
  belongs_to :organization
  belongs_to :user

  validates :timezone, presence: true

  rhino_owner :organization
  rhino_references [ :organization, :user ]
end
