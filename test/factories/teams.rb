# frozen_string_literal: true

FactoryBot.define do
  factory :team do
    organization { nil }
    name { "MyString" }
    group_name { "MyString" }
    flag_url { "MyString" }
    status { "MyString" }
  end
end
