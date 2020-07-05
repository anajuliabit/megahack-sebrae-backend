import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createDrink1593896206646 implements MigrationInterface {
  private table = new Table({
    name: 'drink',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'description',
        type: 'varchar',
      },
      {
        name: 'type',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'url_image',
        type: 'varchar',
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
