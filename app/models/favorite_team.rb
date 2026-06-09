# frozen_string_literal: true

class FavoriteTeam < ApplicationRecord
  belongs_to :user
  belongs_to :team

  rhino_owner :team
  rhino_references [ :user, :team ]
end
