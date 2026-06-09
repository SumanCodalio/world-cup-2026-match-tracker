# frozen_string_literal: true

FactoryBot.define do
  factory :venue do
    organization { nil }
    name { "MyString" }
    city { "MyString" }
    capacity { 1 }
    timezone { "MyString" }
  end
end
