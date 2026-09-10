# frozen_string_literal: true

require_relative "users"

org = Organization.find_or_create_by(name: "Rhino")

admin_role = Role.find_or_create_by(name: "admin")
club_owner_role = Role.find_or_create_by(name: "club_owner")
viewer_role = Role.find_or_create_by(name: "viewer")

admin_user = User.find_by(email: "admin@example.com")
club_owner_user = User.find_by(email: "clubowner@example.com")
viewer_user = User.find_by(email: "viewer@example.com")

if admin_user
  UsersRole.find_or_create_by(user: admin_user, role: admin_role, organization: org)
end

if club_owner_user
  UsersRole.find_or_create_by(user: club_owner_user, role: club_owner_role, organization: org)
end

if viewer_user
  UsersRole.find_or_create_by(user: viewer_user, role: viewer_role, organization: org)
end
