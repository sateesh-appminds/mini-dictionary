export default function arrangeMeanings(response: Array<object>) {
  const meanings = response.map((defination:any) => {
    const values = defination.meanings.map((data:any) => data.definitions);
    return values.flat();
  });
  return meanings.flat();
}
