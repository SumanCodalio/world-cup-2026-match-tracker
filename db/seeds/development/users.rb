# frozen_string_literal: true

AdminUser.find_or_create_by(email: "admin@example.com") do |u|
  u.password = "password"
end

admin = User.find_or_create_by(email: "admin@example.com") do |u|
  u.name = "System Admin"
  u.password = "password"
  u.confirmed_at = Time.current
end

club_owner = User.find_or_create_by(email: "clubowner@example.com") do |u|
  u.name = "Club Owner"
  u.password = "password"
  u.confirmed_at = Time.current
end

viewer = User.find_or_create_by(email: "viewer@example.com") do |u|
  u.name = "General Viewer"
  u.password = "password"
  u.confirmed_at = Time.current
end
