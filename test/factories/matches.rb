# frozen_string_literal: true

FactoryBot.define do
  factory :match do
    venue { nil }
    kickoff_time { "2026-06-09 19:10:56" }
    stage { "MyString" }
    status { "MyString" }
  end
end
