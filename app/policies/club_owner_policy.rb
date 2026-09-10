# frozen_string_literal: true

class ClubOwnerPolicy < Rhino::AdminPolicy
  def create?
    authorize_action(true)
  end

  def update?
    authorize_action(true)
  end

  def destroy?
    authorize_action(true)
  end

  class Scope < Rhino::AdminPolicy::Scope
  end
end
