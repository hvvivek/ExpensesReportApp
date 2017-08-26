class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.text :desc
      t.integer :amount
      t.text :expense_type

      t.timestamps null: false
    end
  end
end
