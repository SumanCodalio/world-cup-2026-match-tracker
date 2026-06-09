# frozen_string_literal: true

FactoryBot.define do
  factory :system_configuration do
    organization { nil }
    setting_key { "MyString" }
    setting_value { "MyString" }
    description { "MyText" }
  end
end
