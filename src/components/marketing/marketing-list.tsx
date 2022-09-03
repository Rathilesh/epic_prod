import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import usePrice from "@utils/use-price";
import Badge from "@components/ui/badge/badge";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
	Marketing,
	MarketingPaginator,
	SortOrder,
	User,
} from "@ts-types/generated";
import { useIsRTL } from "@utils/locals";
import { useState } from "react";
import TitleWithSort from "@components/ui/title-with-sort";

export type IProps = {
	marketing?: MarketingPaginator;
	onPagination: (current: number) => void;
	onSort: (current: any) => void;
	onOrder: (current: string) => void;
};

type SortingObjType = {
	sort: SortOrder;
	column: string | null;
};

const MarketingList = ({ marketing, onPagination, onSort, onOrder }: IProps) => {
	const { data, paginatorInfo } = marketing! ?? {};
	const router = useRouter();
	const { t } = useTranslation();
	// const { alignLeft, alignRight } = useIsRTL();

	const [sortingObj, setSortingObj] = useState<SortingObjType>({
		sort: SortOrder.Desc,
		column: null,
	});

	const onHeaderClick = (column: string | null) => ({
		onClick: () => {
			onSort((currentSortDirection: SortOrder) =>
				currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
			);
			onOrder(column!);

			setSortingObj({
				sort:
					sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
				column: column,
			});
		},
	});

	let columns = [
		// {
		// 	title: t("table:table-item-image"),
		// 	dataIndex: "image",
		// 	key: "image",
		// 	align: alignLeft,
		// 	width: 74,
		// 	render: (image: any, { name }: { name: string }) => (
		// 		<Image
		// 			src={image?.thumbnail ?? siteSettings.product.placeholder}
		// 			alt={name}
		// 			layout="fixed"
		// 			width={42}
		// 			height={42}
		// 			className="rounded overflow-hidden object-cover"
		// 		/>
		// 	),
		// },
		// {
		// 	title: (
		// 		<TitleWithSort
		// 			title={t("table:table-item-title")}
		// 			ascending={
		// 				sortingObj.sort === SortOrder.Asc && sortingObj.column === "name"
		// 			}
		// 			isActive={sortingObj.column === "name"}
		// 		/>
		// 	),
		// 	className: "cursor-pointer",
		// 	dataIndex: "name",
		// 	key: "name",
		// 	align: alignLeft,
		// 	width: 200,
		// 	ellipsis: true,
		// 	onHeaderCell: () => onHeaderClick("name"),
		// },
		// {
		// 	title: t("table:table-item-group"),
		// 	dataIndex: "type",
		// 	key: "type",
		// 	width: 120,
		// 	align: "center",
		// 	ellipsis: true,
		// 	render: (type: any) => (
		// 		<span className="whitespace-nowrap truncate">{type?.name}</span>
		// 	),
		// },
		{
			title: "User",
			dataIndex: "user",
			key: "user",
			width: 120,
			align: "center",
			ellipsis: true,
			render: (user: User) => (
				<span className="whitespace-nowrap truncate">{user?.name}</span>
			),
		},
		{
			title: (
				<TitleWithSort
					title="Date"
					ascending={
						sortingObj.sort === SortOrder.Asc && sortingObj.column === "date"
					}
					isActive={sortingObj.column === "date"}
				/>
			),
			dataIndex: "date",
			key: "date",
			width: 120,
			align: "center",
			ellipsis: true,
			onHeaderCell: () => onHeaderClick("date"),
			render: (date: Date) => (
				<span className="whitespace-nowrap truncate">{date}</span>
			),
		},
		{
			title: (
				<TitleWithSort
					title="App Instalation Count"
					ascending={
						sortingObj.sort === SortOrder.Asc && sortingObj.column === "appinstall"
					}
					isActive={sortingObj.column === "appinstall"}
				/>
			),
			dataIndex: "appinstall",
			key: "appinstall",
			width: 120,
			align: "center",
			ellipsis: true,
			onHeaderCell: () => onHeaderClick("appinstall"),
			render: (appinstall: Number) => (
				<span className="whitespace-nowrap truncate">{appinstall}</span> 
			),
		},
		// {
		// 	title: "Product Type",
		// 	dataIndex: "product_type",
		// 	key: "product_type",
		// 	width: 120,
		// 	align: "center",
		// 	render: (product_type: string) => (
		// 		<span className="whitespace-nowrap truncate">{product_type}</span>
		// 	),
		// },
		// {
		// 	title: (
		// 		<TitleWithSort
		// 			title={t("table:table-item-unit")}
		// 			ascending={
		// 				sortingObj.sort === SortOrder.Asc && sortingObj.column === "price"
		// 			}
		// 			isActive={sortingObj.column === "price"}
		// 		/>
		// 	),
		// 	className: "cursor-pointer",
		// 	dataIndex: "price",
		// 	key: "price",
		// 	align: alignRight,
		// 	width: 100,
		// 	onHeaderCell: () => onHeaderClick("price"),
		// 	render: (value: number, record: Product) => {
		// 		if (record?.product_type === ProductType.Variable) {
		// 			const { price: max_price } = usePrice({
		// 				amount: record?.max_price as number,
		// 			});
		// 			const { price: min_price } = usePrice({
		// 				amount: record?.min_price as number,
		// 			});
		// 			return (
		// 				<span
		// 					className="whitespace-nowrap"
		// 					title={`${min_price} - ${max_price}`}
		// 				>{`${min_price} - ${max_price}`}</span>
		// 			);
		// 		} else {
		// 			const { price } = usePrice({
		// 				amount: value,
		// 			});
		// 			return (
		// 				<span className="whitespace-nowrap" title={price}>
		// 					{price}
		// 				</span>
		// 			);
		// 		}
		// 	},
		// },
		
		{
			title: 'Notes',
			dataIndex: "notes",
			key: "notes",
			align: "center",
			width: 100,
			render: (notes: string) => (
				<span className="whitespace-nowrap truncate">{notes}</span>				
			),
		},
		// {
		// 	title: t("table:table-item-actions"),
		// 	dataIndex: "slug",
		// 	key: "actions",
		// 	align: "center",
		// 	width: 80,
		// 	render: (slug: string, record: Product) => (
		// 		<ActionButtons
		// 			id={record?.id}
		// 			editUrl={`${router.asPath}/${slug}/edit`}
		// 			deleteModalView="DELETE_PRODUCT"
		// 		/>
		// 	),
		// },
	];

	// if (router?.query?.shop) {
	// 	columns = columns?.filter((column) => column?.key !== "shop");
	// }

	return (
		<>
			<div className="rounded overflow-hidden shadow mb-6">
				<Table
					/* @ts-ignore */
					columns={columns}
					emptyText={t("table:empty-table-data")}
					data={data}
					rowKey="id"
					scroll={{ x: 900 }}
				/>
			</div>

			{!!paginatorInfo.total && (
				<div className="flex justify-end items-center">
					<Pagination
						total={paginatorInfo.total}
						current={paginatorInfo.currentPage}
						pageSize={paginatorInfo.perPage}
						onChange={onPagination}
						showLessItems
					/>
				</div>
			)}
		</>
	);
};

export default MarketingList;
