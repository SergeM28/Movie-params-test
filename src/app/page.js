'use client'
import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import TextArea from './Textarea';
import Button from './Button';
import Pagination from './Pagination';

const ProductionParamsForm = () => {
  const initialFormState = {
    projectName: '',
    genre: '',
    format: '',
    unfNumber: '',
    country: '',
    estimatedCost: '',
    synopsis: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const genres = ['Боевик', 'Драма', 'Комедия', 'Ужасы'];
  const formats = ['Онлайн-платформа', 'Большой экран', 'Интернет', 'Другое'];
  const countries = ['Россия', 'США', 'Франция', 'Италия'];

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('productionParams'));
    const savedPage = JSON.parse(localStorage.getItem('currentPage'));
    if (savedData) {
      setFormData(savedData);
    }
    if (savedPage) {
      setCurrentPage(savedPage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('productionParams', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('currentPage', JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName) {
      newErrors.projectName = 'Заполните поле';
    }
    if (!formData.genre) {
      newErrors.genre = 'Заполните поле';
    }
    if (!formData.format) {
      newErrors.format = 'Заполните поле';
    }
    if (!formData.country) {
      newErrors.country = 'Заполните поле';
    }
    if (formData.unfNumber && !/^\d{3}-\d{3}-\d{3}-\d{2}-\d{3}$/.test(formData.unfNumber)) {
      newErrors.unfNumber = 'Некорректный формат УНФ';
    }
    if (formData.estimatedCost && isNaN(formData.estimatedCost)) {
      newErrors.estimatedCost = 'Поле стоимость должно содержать только числа';
    }
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateForm();
  };

  const handleSubmit = () => {
    if (isFormValid) {
      setCurrentPage(2);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem('productionParams');
    localStorage.removeItem('currentPage');
    setFormData(initialFormState);
    setCurrentPage(1);
    setErrors({});
  };

  return (
    <main className="flex overflow-hidden flex-col justify-center items-center px-20 py-24 bg-white max-md:px-5 max-md:pb-24">
      <div className="flex flex-col max-w-full">
        <header className="flex flex-wrap gap-5 justify-between w-full tracking-tight max-md:max-w-full">
          <h1 className="text-5xl title font-semibold leading-[58px] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
            Производственные <br /> параметры фильма
          </h1>
          <Button
            text="Отменить заполнение"
            className="flex w-[225px] justify-center items-center my-auto text-base text-center border border-solid border-neutral-900 border-opacity-20 min-h-[48px] rounded-[41px]"
            onClick={handleCancel} />
        </header>
        <form className="mt-28 max-md:mt-10 max-md:mr-0.5 max-md:max-w-full">
          <div className="flex gap-5 md:gap-24 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <InputField
                name="projectName"
                label="Название проекта"
                type="text"
                placeholder="Название"
                value={formData.projectName}
                onChange={handleChange}
                error={errors.projectName}
                errorAnimation={errors.projectName ? "error-animation" : ""}
              />
              <SelectField
                name="genre"
                label="Жанр"
                options={genres}
                placeholder="Выберите жанр"
                value={formData.genre}
                onChange={handleChange}
                error={errors.genre}
                errorAnimation={errors.genre ? "error-animation" : ""}
              />
              <SelectField
                name="format"
                label="Формат (для онлайн-платформ, большого экрана, интернета, другое)"
                options={formats}
                value={formData.format}
                onChange={handleChange}
                error={errors.format}
                errorAnimation={errors.format ? "error-animation" : ""}
                placeholder="Выберите формат"
              />
              <InputField
                name="unfNumber"
                label="№ УНФ или отсутствует"
                type="text"
                placeholder="890-000-000-00-000"
                value={formData.unfNumber}
                onChange={handleChange}
                error={errors.unfNumber}
                errorAnimation={errors.unfNumber ? "error-animation" : ""}
              />
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <SelectField
                name="country"
                label="Страна-производитель (копродукция)"
                options={countries}
                value={formData.country}
                onChange={handleChange}
                error={errors.country}
                errorAnimation={errors.country ? "error-animation" : ""}
                placeholder="Выберите страну"
              />
              <InputField
                name="estimatedCost"
                label="Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть"
                type="text"
                placeholder="Сметная стоимость"
                value={formData.estimatedCost}
                onChange={handleChange}
                error={errors.estimatedCost}
                errorAnimation={errors.estimatedCost ? "error-animation" : ""}
              />
              <TextArea
                name="synopsis"
                label="Синопсис"
                placeholder="Напишите краткое изложение"
                value={formData.synopsis}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <footer className="flex relative flex-wrap gap-5 justify-between lg:justify-center self-end mt-24 max-w-full text-center w-full max-md:mt-10 max-md:mr-0.5">
          <Pagination totalPages={4} currentPage={currentPage} />
          <Button
            text="Следующий шаг"
            icon={true}
            className={`button-next relative sm:absolute right-0 flex justify-center w-[248px] items-center text-base tracking-tight min-h-[48px] rounded-[41px] gap-4 ${isFormValid ? 'bg-zinc-100 button-active' : 'bg-[#EFEFEF] cursor-not-allowed text-[#acacac]'}`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          />
        </footer>
      </div>
    </main>
  );
}

export default ProductionParamsForm;