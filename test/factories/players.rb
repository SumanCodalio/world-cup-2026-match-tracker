# frozen_string_literal: true

FactoryBot.define do
  factory :player do
    team { nil }
    name { "MyString" }
    position { "MyString" }
    jersey_number { 1 }
  end
end
