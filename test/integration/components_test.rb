require 'test_helper'

class ComponentsViewTest < ActiveSupport::TestCase

  file_path = Rails.root.join('app', 'views', 'govuk_component', 'docs.yml')
  components = YAML::load_file(file_path)

  components.each do |component|
    puts component['id']
    view = create_view(component['id'])
    component['fixtures'].each do |name, fixture|
      test "Component '#{component['id']}' renders with fixture '#{fixture}'" do
        puts " - #{name}"
        render_view(view, fixture)
      end
    end
  end

  def create_view(name)
    view_path = Rails.root.join('app', 'views', 'govuk_component', "#{name}.raw.html.erb")
    ERB.new(File.read(view_path))
  end

  def render_view(view, locals)
    locals = OpenStruct.new(fixture.merge(default_view_locals))
    view.result(locals.instance_eval { binding })
  end

  def default_view_locals
    {
      'raw' => ->(content) { content }
    }
  end
end
