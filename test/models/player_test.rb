# frozen_string_literal: true

require "test_helper"

class PlayerTest < ActiveSupport::TestCase
  test "should create valid player with attributes" do
    player = Player.new(
      name: "Lionel",
      surname: "Messi",
      nationality: "Argentina",
      club: "Inter Miami",
      position: "Forward"
    )
    assert player.valid?
  end

  test "should require name" do
    player = Player.new(position: "Forward")
    assert_not player.valid?
    assert_includes player.errors[:name], "can't be blank"
  end
end
