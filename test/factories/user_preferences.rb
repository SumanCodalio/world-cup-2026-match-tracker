# frozen_string_literal: true

FactoryBot.define do
  factory :user_preference do
    organization { nil }
    user { nil }
    timezone { "MyString" }
    receive_notifications { false }
  end
end
