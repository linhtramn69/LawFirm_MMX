import { Select } from 'antd';

function SelectForm({value, options}) {
  console.log(value);
  let data = []
  options.map((value, index) => {
      return (
        data.push({
          value: value._id,
          label: value.ten_chuc_vu
        })
      )
  })
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Select
      defaultValue={value}
      style={{
        width: '100%',
      }}
      onChange={handleChange}
      tokenSeparators={[',']}
      options={data}
    />
  )

}
export default SelectForm;
