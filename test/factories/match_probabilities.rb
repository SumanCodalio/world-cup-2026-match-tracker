# frozen_string_literal: true

FactoryBot.define do
  factory :match_probability do
    match { nil }
    prediction_model { nil }
    home_win_prob { 1.5 }
    away_win_prob { 1.5 }
    draw_prob { 1.5 }
    factors_summary { "MyText" }
  end
end
