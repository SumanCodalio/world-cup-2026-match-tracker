# frozen_string_literal: true

class SystemConfiguration < ApplicationRecord
  belongs_to :organization

  validates :setting_key, presence: true
  validates :setting_value, presence: true

  rhino_owner :organization
  rhino_references [ :organization ]
end
