# frozen_string_literal: true

FactoryBot.define do
  factory :match_team do
    match { nil }
    team { nil }
    is_home { false }
    score { 1 }
  end
end
