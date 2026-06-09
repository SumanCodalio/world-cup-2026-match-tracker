# frozen_string_literal: true

FactoryBot.define do
  factory :tournament_prediction do
    team { nil }
    prediction_type { "MyString" }
    probability { 1.5 }
    rationale { "MyText" }
  end
end
