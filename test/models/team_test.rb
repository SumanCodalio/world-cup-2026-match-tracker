# frozen_string_literal: true

require "test_helper"

class TeamTest < ActiveSupport::TestCase
  test "creates team with squad players" do
    org = Organization.create!(name: "Test Org")
    team = Team.create!(
      organization: org,
      name: "FC Barcelona",
      group_name: "BAR",
      players_attributes: [
        { name: "Pedri", position: "Midfielder", jersey_number: 8 }
      ]
    )

    assert_equal "FC Barcelona", team.name
    assert_equal "BAR", team.group_name
    assert_equal "active", team.status
    assert_equal 1, team.players.count
    assert_equal "Pedri", team.players.first.name
  end
end
