# frozen_string_literal: true

FactoryBot.define do
  factory :prediction_model do
    organization { nil }
    name { "MyString" }
    version { "MyString" }
    is_active { false }
    hit_rate { 1.5 }
  end
end
