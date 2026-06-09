# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    organization { nil }
    title { "MyString" }
    content { "MyText" }
    published_at { "2026-06-09 19:11:59" }
    image_url { "MyString" }
  end
end
