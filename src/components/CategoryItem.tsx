
type CategoryItemProps = {
  title: string,
  index: number,
  active: string,
  onChangeCategory: (i: number) => void
}


const CategoryItem: React.FC<CategoryItemProps> = ({ title, onChangeCategory, index, active }) => {
  return (

      <li className={active} onClick={() => onChangeCategory(index)}>
        {title}
      </li>

  );
};

export default CategoryItem;
