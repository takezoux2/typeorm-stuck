import * as typeorm from "typeorm"
import { Entity } from "typeorm"

/**
 * If you get new connection in the transaction, there is a risk to stuck.
 *
 * If you satisfy all below conditions, program will be stuck.
 *
 * 1. Single process(not multi threaded)
 * 2. Use coneection pool
 * 3. Connection pool blocks to rent connection when there are no connections in the pool
 * 4. You get new connection in the transaction.
 *
 */
async function run() {
  const dataSource = new typeorm.DataSource({
    type: "mysql",
    username: "root",
    password: "root",
    database: "test",
    entities: [MyTable],
    synchronize: true
  })
  await dataSource.initialize()
  const ConnectionPoolSize = 10

  const results: Promise<string>[] = []
  for (let i = 1; i <= ConnectionPoolSize; i++) {
    const r = dataSource.transaction(async (entityManager) => {
      console.log(`Start ${i}th transaction`)
      await entityManager.save(MyTable, { id: i, name: "test" + i })
      console.log(`Get new connection in the ${i}th transaction`)
      // program will stuck here
      const otherEntityManager = dataSource.manager
      await otherEntityManager.findOneBy(MyTable, { id: i })
      console.log(`End ${i}th transaction`)
      return "done"
    })
    results.push(r)
  }

  await Promise.all(results)
  console.log("This message is Never printed")
  await dataSource.destroy()
}

@Entity()
class MyTable {
  @typeorm.PrimaryColumn()
  id!: number

  @typeorm.Column()
  name!: string
}

run()
